import { afterEach, beforeEach, describe, expect, it, jest } from '@jest/globals';
import { logger } from '@/lib/logger';

describe('Logger', () => {
  // Mock console methods properly
  const consoleSpy = {
    debug: jest.spyOn(console, 'debug').mockImplementation(() => {}),
    info: jest.spyOn(console, 'info').mockImplementation(() => {}),
    warn: jest.spyOn(console, 'warn').mockImplementation(() => {}),
    error: jest.spyOn(console, 'error').mockImplementation(() => {})
  };
  
  const originalNodeEnv = process.env.NODE_ENV;
  
  beforeEach(() => {
    // Reset all mocks before each test
    jest.clearAllMocks();
  });
  
  afterEach(() => {
    // Restore original environment after tests
    Object.defineProperty(process.env, 'NODE_ENV', { value: originalNodeEnv });
  });
  
  describe('Basic logging functions', () => {
    it('should log debug messages', () => {
      const message = 'Debug message';
      const context = { key: 'value' };
      const userId = 'user123';
      
      logger.debug(message, context, userId);
      
      expect(consoleSpy.debug).toHaveBeenCalled();
      expect(consoleSpy.debug.mock.calls[0][0]).toContain(message);
      expect(consoleSpy.debug.mock.calls[0][0]).toContain(userId);
      expect(consoleSpy.debug.mock.calls[0][1]).toEqual(context);
    });
    
    it('should log info messages', () => {
      const message = 'Info message';
      
      logger.info(message);
      
      expect(consoleSpy.info).toHaveBeenCalled();
      expect(consoleSpy.info.mock.calls[0][0]).toContain(message);
    });
    
    it('should log warning messages', () => {
      const message = 'Warning message';
      
      logger.warn(message);
      
      expect(consoleSpy.warn).toHaveBeenCalled();
      expect(consoleSpy.warn.mock.calls[0][0]).toContain(message);
    });
    
    it('should log error messages', () => {
      const message = 'Error message';
      const context = { error: 'Something went wrong' };
      
      logger.error(message, context);
      
      expect(consoleSpy.error).toHaveBeenCalled();
      expect(consoleSpy.error.mock.calls[0][0]).toContain(message);
      expect(consoleSpy.error.mock.calls[0][1]).toEqual(context);
    });
  });
  
  describe('Specialized logging functions', () => {
    it('should log auth successes', () => {
      const action = 'login';
      const success = true;
      const userId = 'user123';
      const context = { email: 'user@example.com' };
      
      logger.auth(action, success, userId, context);
      
      expect(consoleSpy.info).toHaveBeenCalled();
      const loggedMessage = consoleSpy.info.mock.calls[0][0];
      expect(loggedMessage).toContain(action);
      expect(loggedMessage).toContain('succeeded');
      expect(loggedMessage).toContain(userId);
      expect(consoleSpy.info.mock.calls[0][1]).toEqual(context);
    });
    
    it('should log auth failures', () => {
      const action = 'login';
      const success = false;
      const context = { 
        email: 'user@example.com',
        reason: 'Invalid password'
      };
      
      logger.auth(action, success, undefined, context);
      
      expect(consoleSpy.warn).toHaveBeenCalled();
      const loggedMessage = consoleSpy.warn.mock.calls[0][0];
      expect(loggedMessage).toContain(action);
      expect(loggedMessage).toContain('failed');
      expect(consoleSpy.warn.mock.calls[0][1]).toEqual(context);
    });
    
    it('should log data changes', () => {
      const entity = 'user';
      const action = 'update';
      const userId = 'user123';
      const context = { changedFields: ['name', 'email'] };
      
      logger.dataChange(entity, action, userId, context);
      
      expect(consoleSpy.info).toHaveBeenCalled();
      const loggedMessage = consoleSpy.info.mock.calls[0][0];
      expect(loggedMessage).toContain(entity);
      expect(loggedMessage).toContain(action);
      expect(loggedMessage).toContain(userId);
      expect(consoleSpy.info.mock.calls[0][1]).toEqual(context);
    });
  });
  
  describe('Production environment', () => {
    it('should log as JSON in production', () => {
      // Set environment to production
      Object.defineProperty(process.env, 'NODE_ENV', { value: 'production' });
      
      const message = 'Production log';
      logger.info(message);
      
      expect(consoleSpy.info).toHaveBeenCalled();
      // In production, we should get a JSON string
      const loggedData = consoleSpy.info.mock.calls[0][0];
      expect(typeof loggedData).toBe('string');
      
      // Should be valid JSON with expected properties
      const parsedLog = JSON.parse(loggedData);
      expect(parsedLog).toHaveProperty('level', 'info');
      expect(parsedLog).toHaveProperty('message', message);
      expect(parsedLog).toHaveProperty('timestamp');
    });
  });
}); 