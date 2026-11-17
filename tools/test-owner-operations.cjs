const path = require('node:path');
const { Architect } = require('@angular-devkit/architect');
const { WorkspaceNodeModulesArchitectHost } = require('@angular-devkit/architect/node');
const { workspaces, schema } = require('@angular-devkit/core');
const { NodeJsSyncHost, createConsoleLogger } = require('@angular-devkit/core/node');
(async () => {
  const root = path.resolve(__dirname, '..');
  const { workspace } = await workspaces.readWorkspace(root, workspaces.createWorkspaceHost(new NodeJsSyncHost()));
  const registry = new schema.CoreSchemaRegistry(); registry.addPostTransform(schema.transforms.addUndefinedDefaults);
  const architect = new Architect(new WorkspaceNodeModulesArchitectHost(workspace, root), registry);
  const run = await architect.scheduleTarget({ project: 'MainSiteOcpio', target: 'test' }, {
    watch: false, browsers: 'ChromeHeadless', scripts: [], progress: false,
    tsConfig: 'tsconfig.owner-operations-spec.json', include: ['src/services/owner-operations.service.spec.ts'],
  }, { logger: createConsoleLogger() });
  const result = await run.result; await run.stop(); process.exitCode = result.success ? 0 : 1;
})().catch(error => { console.error(error); process.exitCode = 1; });
