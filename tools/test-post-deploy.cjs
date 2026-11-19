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
    tsConfig: 'tsconfig.post-deploy-spec.json', include: [
      'src/services/welcome-coupon.service.spec.ts',
      'src/services/promo-seats-booking.spec.ts',
      'src/app/profile-ba/components/booking-benefits/booking-benefits.component.spec.ts',
      'src/app/profile-ba/components/confirm-record/confirm-record-discounts.spec.ts',
      'src/app/profile-ba/components/calculator-player/calculator-coupon-failure.spec.ts',
      'src/app/profile-ba/helpers/booking-price.spec.ts',
      'src/app/components/navigation-failure/navigation-failure.component.spec.ts',
    ],
  }, { logger: createConsoleLogger() });
  const result = await run.result; await run.stop(); process.exitCode = result.success ? 0 : 1;
})().catch(error => { console.error(error); process.exitCode = 1; });
