const path = require('node:path');
const { Architect } = require('@angular-devkit/architect');
const { WorkspaceNodeModulesArchitectHost } = require('@angular-devkit/architect/node');
const { workspaces, schema } = require('@angular-devkit/core');
const { NodeJsSyncHost, createConsoleLogger } = require('@angular-devkit/core/node');

async function main() {
  const root = path.resolve(__dirname, '..');
  const { workspace } = await workspaces.readWorkspace(root, workspaces.createWorkspaceHost(new NodeJsSyncHost()));
  const registry = new schema.CoreSchemaRegistry();
  registry.addPostTransform(schema.transforms.addUndefinedDefaults);
  const architect = new Architect(new WorkspaceNodeModulesArchitectHost(workspace, root), registry);
  // Карты и Bootstrap не нужны HTTP-тестам. URL карты в общей test-конфигурации
  // не проходит схему Angular CLI; старые CLI-spec проверяются отдельным запуском.
  const run = await architect.scheduleTarget({ project: 'MainSiteOcpio', target: 'test' }, {
    watch: false, browsers: 'ChromeHeadless', scripts: [], progress: false,
    tsConfig: 'tsconfig.auth-spec.json', include: ['src/app/auth/remembered-session.service.spec.ts'],
  }, { logger: createConsoleLogger() });
  const result = await run.result;
  await run.stop();
  process.exitCode = result.success ? 0 : 1;
}

main().catch(error => { console.error(error); process.exitCode = 1; });
