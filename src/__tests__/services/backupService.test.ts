import { afterAll, beforeEach, describe, expect, it, jest } from '@jest/globals';
import backupService from '@/services/backupService';
import { logger } from '@/lib/logger';

// Mock the logger
jest.mock('@/lib/logger', () => ({
  logger: {
    info: jest.fn(),
    error: jest.fn()
  }
}));

// Mock environment variables
const originalEnv = process.env;

describe('backupService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Reset environment variables before each test
    process.env = { ...originalEnv };
  });

  afterAll(() => {
    // Restore original environment variables
    process.env = originalEnv;
  });
  
  describe('createBackup', () => {
    it('should create a backup with default name when no name is provided', async () => {
      // Setup environment variable
      process.env.SUPABASE_SERVICE_ROLE_KEY = 'test-key';
      
      // Execute
      const result = await backupService.createBackup();
      
      // Verify
      expect(result).toHaveProperty('id');
      expect(result).toHaveProperty('name');
      expect(result.name).toMatch(/^backup-/);
      expect(result).toHaveProperty('createdAt');
      expect(result).toHaveProperty('status', 'completed');
      expect(logger.info).toHaveBeenCalledWith('Backup created', expect.any(Object));
    });
    
    it('should create a backup with provided name', async () => {
      // Setup environment variable
      process.env.SUPABASE_SERVICE_ROLE_KEY = 'test-key';
      const backupName = 'test-backup';
      
      // Execute
      const result = await backupService.createBackup(backupName);
      
      // Verify
      expect(result).toHaveProperty('name', backupName);
      expect(logger.info).toHaveBeenCalledWith('Backup created', expect.objectContaining({
        name: backupName
      }));
    });
    
    it('should throw an error when SERVICE_ROLE key is not available', async () => {
      // Setup: ensure environment variable is not set
      process.env.SUPABASE_SERVICE_ROLE_KEY = '';
      
      // Execute & Verify
      await expect(backupService.createBackup()).rejects
        .toThrow('SERVICE_ROLE key is required for backup operations');
      expect(logger.error).toHaveBeenCalledWith('Failed to create backup', expect.any(Object));
    });
  });
  
  describe('listBackups', () => {
    it('should list available backups', async () => {
      // Setup environment variable
      process.env.SUPABASE_SERVICE_ROLE_KEY = 'test-key';
      
      // Execute
      const results = await backupService.listBackups();
      
      // Verify
      expect(Array.isArray(results)).toBe(true);
      expect(results.length).toBeGreaterThan(0);
      expect(results[0]).toHaveProperty('id');
      expect(results[0]).toHaveProperty('createdAt');
      expect(results[0]).toHaveProperty('name');
      expect(results[0]).toHaveProperty('size');
      expect(results[0]).toHaveProperty('status');
      expect(logger.info).toHaveBeenCalledWith('Listed backups', expect.any(Object));
    });
    
    it('should throw an error when SERVICE_ROLE key is not available', async () => {
      // Setup: ensure environment variable is not set
      process.env.SUPABASE_SERVICE_ROLE_KEY = '';
      
      // Execute & Verify
      await expect(backupService.listBackups()).rejects
        .toThrow('SERVICE_ROLE key is required for backup operations');
      expect(logger.error).toHaveBeenCalledWith('Failed to list backups', expect.any(Object));
    });
  });
  
  describe('restoreBackup', () => {
    it('should restore a specific backup', async () => {
      // Setup environment variable
      process.env.SUPABASE_SERVICE_ROLE_KEY = 'test-key';
      const backupId = 'backup-123';
      
      // Execute
      const result = await backupService.restoreBackup(backupId);
      
      // Verify
      expect(result).toHaveProperty('success', true);
      expect(result).toHaveProperty('message');
      expect(logger.info).toHaveBeenCalledWith('Backup restore initiated', expect.objectContaining({
        backupId
      }));
    });
    
    it('should throw an error when SERVICE_ROLE key is not available', async () => {
      // Setup: ensure environment variable is not set
      process.env.SUPABASE_SERVICE_ROLE_KEY = '';
      const backupId = 'backup-123';
      
      // Execute & Verify
      await expect(backupService.restoreBackup(backupId)).rejects
        .toThrow('SERVICE_ROLE key is required for backup operations');
      expect(logger.error).toHaveBeenCalledWith('Failed to restore backup', expect.objectContaining({
        backupId
      }));
    });
  });
  
  describe('configureAutomaticBackups', () => {
    it('should configure automatic backups', async () => {
      // Setup environment variable
      process.env.SUPABASE_SERVICE_ROLE_KEY = 'test-key';
      const config = {
        dailyEnabled: true,
        weeklyEnabled: true,
        monthlyEnabled: false,
        retentionDays: 30
      };
      
      // Execute
      const result = await backupService.configureAutomaticBackups(config);
      
      // Verify
      expect(result).toHaveProperty('success', true);
      expect(result).toHaveProperty('message');
      expect(logger.info).toHaveBeenCalledWith('Automatic backup configuration updated', expect.objectContaining({
        config
      }));
    });
    
    it('should throw an error when SERVICE_ROLE key is not available', async () => {
      // Setup: ensure environment variable is not set
      process.env.SUPABASE_SERVICE_ROLE_KEY = '';
      const config = {
        dailyEnabled: true,
        weeklyEnabled: true,
        monthlyEnabled: false,
        retentionDays: 30
      };
      
      // Execute & Verify
      await expect(backupService.configureAutomaticBackups(config)).rejects
        .toThrow('SERVICE_ROLE key is required for backup operations');
      expect(logger.error).toHaveBeenCalledWith('Failed to configure automatic backups', expect.any(Object));
    });
  });
}); 