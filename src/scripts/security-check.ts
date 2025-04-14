#!/usr/bin/env node
/**
 * Script para verificação de segurança das dependências
 * 
 * Este script deve ser executado regularmente para identificar
 * vulnerabilidades e manter dependências atualizadas.
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

// Diretório para armazenar relatórios
const REPORTS_DIR = path.join(process.cwd(), 'security-reports');

// Certifique-se de que o diretório existe
if (!fs.existsSync(REPORTS_DIR)) {
  fs.mkdirSync(REPORTS_DIR, { recursive: true });
}

// Função para registrar logs
function log(message: string, type: 'info' | 'error' | 'warn' = 'info') {
  const timestamp = new Date().toISOString();
  const logMessage = `[${timestamp}] [${type.toUpperCase()}] ${message}`;
  
  console[type](logMessage);
  
  // Também salva no arquivo de log
  const logFile = path.join(REPORTS_DIR, 'security-check-log.txt');
  fs.appendFileSync(logFile, logMessage + '\n');
}

// Função para executar comandos shell
function execute(command: string): string {
  try {
    return execSync(command, { encoding: 'utf8' });
  } catch (error) {
    if (error instanceof Error) {
      log(`Erro ao executar comando: ${error.message}`, 'error');
    }
    return '';
  }
}

// Função para verificar vulnerabilidades
function checkVulnerabilities() {
  try {
    log('Verificando vulnerabilidades nas dependências...');
    
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const reportFile = path.join(REPORTS_DIR, `npm-audit-${timestamp}.json`);
    
    // Executar npm audit e salvar relatório
    const auditOutput = execute('npm audit --json');
    fs.writeFileSync(reportFile, auditOutput);
    
    // Analisar resultado
    const auditResult = JSON.parse(auditOutput);
    const vulnerabilitiesCount = auditResult.metadata?.vulnerabilities?.total || 0;
    
    if (vulnerabilitiesCount > 0) {
      log(`Encontradas ${vulnerabilitiesCount} vulnerabilidades. Detalhes salvos em ${reportFile}`, 'warn');
      
      // Se houver vulnerabilidades críticas ou altas, tente corrigir automaticamente
      const highVulnerabilities = auditResult.metadata?.vulnerabilities?.high || 0;
      const criticalVulnerabilities = auditResult.metadata?.vulnerabilities?.critical || 0;
      
      if (highVulnerabilities > 0 || criticalVulnerabilities > 0) {
        log(`Tentando corrigir ${highVulnerabilities} vulnerabilidades altas e ${criticalVulnerabilities} críticas...`, 'warn');
        
        // Tenta corrigir vulnerabilidades
        const fixOutput = execute('npm audit fix --force');
        log('Resultado do fix:\n' + fixOutput);
        
        // Verifica novamente após a correção
        const afterFixOutput = execute('npm audit --json');
        const afterFixResult = JSON.parse(afterFixOutput);
        const remainingVulnerabilities = afterFixResult.metadata?.vulnerabilities?.total || 0;
        
        if (remainingVulnerabilities > 0) {
          log(`Ainda restam ${remainingVulnerabilities} vulnerabilidades após tentativa de correção.`, 'warn');
        } else {
          log('Todas as vulnerabilidades foram corrigidas!', 'info');
        }
      }
    } else {
      log('Nenhuma vulnerabilidade encontrada!', 'info');
    }
    
    return vulnerabilitiesCount;
  } catch (error) {
    if (error instanceof Error) {
      log(`Falha ao verificar vulnerabilidades: ${error.message}`, 'error');
    }
    return -1;
  }
}

// Função para verificar atualizações disponíveis
function checkOutdatedDependencies() {
  try {
    log('Verificando dependências desatualizadas...');
    
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const reportFile = path.join(REPORTS_DIR, `npm-outdated-${timestamp}.json`);
    
    // Executar npm outdated e salvar relatório
    const outdatedOutput = execute('npm outdated --json');
    fs.writeFileSync(reportFile, outdatedOutput || '{}');
    
    // Se não houver dependências desatualizadas, o comando retorna string vazia
    if (!outdatedOutput) {
      log('Todas as dependências estão atualizadas!', 'info');
      return 0;
    }
    
    // Analisar resultado
    const outdatedResult = JSON.parse(outdatedOutput);
    const outdatedCount = Object.keys(outdatedResult).length;
    
    if (outdatedCount > 0) {
      log(`Encontradas ${outdatedCount} dependências desatualizadas. Detalhes salvos em ${reportFile}`, 'warn');
      
      // Lista as dependências desatualizadas
      Object.entries(outdatedResult).forEach(([pkg, info]) => {
        const typedInfo = info as any;
        log(`${pkg}: ${typedInfo.current} -> ${typedInfo.latest}`, 'info');
      });
    } else {
      log('Todas as dependências estão atualizadas!', 'info');
    }
    
    return outdatedCount;
  } catch (error) {
    if (error instanceof Error) {
      log(`Falha ao verificar dependências desatualizadas: ${error.message}`, 'error');
    }
    return -1;
  }
}

// Função para verificar vulnerabilidades de produção x desenvolvimento
function analyzeDependencyUsage() {
  try {
    log('Analisando uso de dependências...');
    
    // Ler package.json
    const packageJsonPath = path.join(process.cwd(), 'package.json');
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    
    const dependencies = Object.keys(packageJson.dependencies || {});
    const devDependencies = Object.keys(packageJson.devDependencies || {});
    
    log(`Dependências de produção: ${dependencies.length}`);
    log(`Dependências de desenvolvimento: ${devDependencies.length}`);
    
    // Verificar se há dependências que deveriam ser de desenvolvimento
    const potentialDevDeps = dependencies.filter(dep => 
      dep.includes('eslint') || 
      dep.includes('prettier') || 
      dep.includes('test') || 
      dep.includes('mock') || 
      dep.includes('dev') ||
      dep.includes('debug')
    );
    
    if (potentialDevDeps.length > 0) {
      log(`Possíveis dependências que deveriam ser movidas para devDependencies: ${potentialDevDeps.join(', ')}`, 'warn');
    }
    
    return {
      production: dependencies.length,
      development: devDependencies.length,
      potentialIssues: potentialDevDeps.length
    };
  } catch (error) {
    if (error instanceof Error) {
      log(`Falha ao analisar uso de dependências: ${error.message}`, 'error');
    }
    return {
      production: -1,
      development: -1,
      potentialIssues: -1
    };
  }
}

// Função principal para executar a verificação
async function runSecurityCheck() {
  try {
    log('Iniciando verificação de segurança');
    
    // Verificar vulnerabilidades
    const vulnerabilities = checkVulnerabilities();
    
    // Verificar dependências desatualizadas
    const outdatedDeps = checkOutdatedDependencies();
    
    // Analisar uso de dependências
    const depUsage = analyzeDependencyUsage();
    
    // Gerar relatório resumido
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const summaryFile = path.join(REPORTS_DIR, `security-summary-${timestamp}.txt`);
    
    const summary = `
RELATÓRIO DE SEGURANÇA - ${new Date().toISOString()}
======================================================

Vulnerabilidades encontradas: ${vulnerabilities}
Dependências desatualizadas: ${outdatedDeps}
Dependências de produção: ${depUsage.production}
Dependências de desenvolvimento: ${depUsage.development}
Possíveis problemas de classificação: ${depUsage.potentialIssues}

Para mais detalhes, veja os relatórios completos na pasta:
${REPORTS_DIR}
    `;
    
    fs.writeFileSync(summaryFile, summary);
    log(`Verificação concluída. Relatório resumido salvo em: ${summaryFile}`);
    
    // Em um ambiente CI/CD, aqui poderíamos adicionar uma falha se 
    // fossem encontradas vulnerabilidades críticas
    
    process.exit(0);
  } catch (error) {
    if (error instanceof Error) {
      log(`Falha na verificação de segurança: ${error.message}`, 'error');
    }
    process.exit(1);
  }
}

// Executar verificação
runSecurityCheck(); 