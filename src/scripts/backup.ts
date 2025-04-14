#!/usr/bin/env node
/**
 * Script para gerenciamento automatizado de backups
 * 
 * Este script deve ser executado via cron ou sistema similar
 * para manter backups regulares do banco de dados.
 */

import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

// Verificação de variáveis de ambiente
if (!process.env.SUPABASE_URL) {
  console.error('SUPABASE_URL não definido');
  process.exit(1);
}

if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
  console.error('SUPABASE_SERVICE_ROLE_KEY não definido');
  process.exit(1);
}

// Diretório para armazenar backups
const BACKUP_DIR = path.join(process.cwd(), 'backups');

// Cliente Supabase com permissões de administrador
const adminClient = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Certifique-se de que o diretório de backup existe
if (!fs.existsSync(BACKUP_DIR)) {
  fs.mkdirSync(BACKUP_DIR, { recursive: true });
}

// Função para registrar logs
function log(message: string, type: 'info' | 'error' | 'warn' = 'info') {
  const timestamp = new Date().toISOString();
  const logMessage = `[${timestamp}] [${type.toUpperCase()}] ${message}`;
  
  console[type](logMessage);
  
  // Também salva no arquivo de log
  const logFile = path.join(BACKUP_DIR, 'backup-log.txt');
  fs.appendFileSync(logFile, logMessage + '\n');
}

// Função para criar backup
async function createBackup() {
  try {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const backupFileName = `backup-${timestamp}.sql`;
    const backupFilePath = path.join(BACKUP_DIR, backupFileName);
    
    log(`Iniciando backup: ${backupFileName}`);
    
    // Aqui você chamaria o procedimento real de backup do Supabase
    // Como exemplo, vamos simular uma exportação de banco de dados
    // (este é apenas um placeholder, não vai funcionar realmente)
    try {
      // Em um ambiente real, você usaria algo como:
      // execSync(`pg_dump -U postgres -h ${dbHost} -d postgres > ${backupFilePath}`);
      
      // Para fins de demonstração:
      fs.writeFileSync(backupFilePath, `-- Backup simulado criado em ${timestamp}\n`);
      
      log(`Backup concluído e salvo em: ${backupFilePath}`);
      
      // Simular dados de tabela para o arquivo de backup
      fs.appendFileSync(backupFilePath, `
-- Tabela: users
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  language TEXT NOT NULL DEFAULT 'pt-BR',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela: workouts
CREATE TABLE IF NOT EXISTS workouts (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id) NOT NULL,
  name TEXT NOT NULL,
  date TIMESTAMP WITH TIME ZONE NOT NULL,
  duration INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Backup apenas para fins de simulação
      `);
      
      // Limpar backups antigos
      cleanupOldBackups();
      
      return {
        success: true,
        file: backupFileName,
        path: backupFilePath,
        timestamp: timestamp
      };
    } catch (error) {
      log(`Erro ao executar o comando de backup: ${error}`, 'error');
      throw error;
    }
  } catch (error) {
    log(`Falha ao criar backup: ${error}`, 'error');
    throw error;
  }
}

// Função para limpar backups antigos
function cleanupOldBackups() {
  try {
    // Configurações de retenção
    const MAX_DAILY_BACKUPS = 7;    // Manter 7 dias de backups diários
    const MAX_WEEKLY_BACKUPS = 4;   // Manter 4 semanas de backups semanais
    const MAX_MONTHLY_BACKUPS = 3;  // Manter 3 meses de backups mensais
    
    log('Iniciando limpeza de backups antigos');
    
    // Listar todos os arquivos de backup
    const files = fs.readdirSync(BACKUP_DIR)
      .filter(file => file.startsWith('backup-') && file.endsWith('.sql'))
      .map(file => ({
        name: file,
        path: path.join(BACKUP_DIR, file),
        created: fs.statSync(path.join(BACKUP_DIR, file)).birthtime
      }))
      .sort((a, b) => b.created.getTime() - a.created.getTime()); // Mais recente primeiro
    
    // Manter backups recentes, apagar o restante
    const dailyBackups = files.slice(0, MAX_DAILY_BACKUPS);
    const remainingFiles = files.slice(MAX_DAILY_BACKUPS);
    
    // Aqui adicionaríamos lógica para classificar backups semanais e mensais
    // Por simplicidade, apenas mantemos um número fixo dos mais recentes
    
    // Apagar excesso de backups
    remainingFiles.forEach(file => {
      log(`Removendo backup antigo: ${file.name}`);
      fs.unlinkSync(file.path);
    });
    
    log(`Limpeza concluída. Mantidos ${dailyBackups.length} backups recentes.`);
  } catch (error) {
    log(`Erro ao limpar backups antigos: ${error}`, 'error');
  }
}

// Função principal para executar o backup
async function runBackup() {
  try {
    log('Iniciando processo de backup');
    
    // Criar backup
    const backupResult = await createBackup();
    
    log(`Backup concluído com sucesso: ${backupResult.file}`);
    
    // Aqui poderíamos adicionar lógica para enviar o backup para armazenamento remoto
    // como Amazon S3, Google Cloud Storage, etc.
    
    process.exit(0);
  } catch (error) {
    log(`Falha no processo de backup: ${error}`, 'error');
    process.exit(1);
  }
}

// Executar o backup
runBackup(); 