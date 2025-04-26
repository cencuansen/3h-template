#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const { program } = require('commander');
const pkg = require('../package.json');

program
    .name('3h-template-test')
    .argument('<project-name>', '项目名称') // 声明必需的位置参数
    .usage('<project-name> [options]')
    .version(pkg.version, '-v, --version')
    .option('-y, --yes', '跳过确认步骤')
    .parse(process.argv);

const options = program.opts();
const projectName = program.args[0];

if (!projectName) {
    program.outputHelp();
    console.log('\n错误：必须提供项目名称');
    process.exit(1);
}

// 获取参数
const templateDir = path.join(__dirname, '../template');
const targetDir = path.join(process.cwd(), projectName);

// 复制模板
function copyDir(src, dest) {
    fs.mkdirSync(dest, {recursive: true});
    const entries = fs.readdirSync(src, {withFileTypes: true});

    for (const entry of entries) {
        const srcPath = path.join(src, entry.name);
        const destPath = path.join(dest, entry.name);

        entry.isDirectory()
            ? copyDir(srcPath, destPath)
            : fs.copyFileSync(srcPath, destPath);
    }
}

// 变量替换
function replaceVariables(dir) {
    const files = fs.readdirSync(dir);

    files.forEach(file => {
        const filePath = path.join(dir, file);
        if (fs.statSync(filePath).isDirectory()) {
            replaceVariables(filePath);
        } else {
            let content = fs.readFileSync(filePath, 'utf-8');
            content = content.replace(/\[%PROJECT_NAME%]/g, projectName);
            fs.writeFileSync(filePath, content);
        }
    });
}

// 主流程
async function main() {
    try {
        // 复制模板
        copyDir(templateDir, targetDir);

        // 替换变量
        replaceVariables(targetDir);

        // 进入目录
        // process.chdir(targetDir);
        // 安装依赖
        // execSync('npm install', {stdio: 'inherit'});

        console.log(`cd ${targetDir}`);
        console.log(`npm install`);
        console.log(`npm run dev`);
    } catch (error) {
        console.error('❌ 创建失败:', error);
    }
}

main().then(r => {
});
