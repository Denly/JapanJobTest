import { App } from '@/app';
import { AuthRoute } from '@routes/auth.route';
import { UserRoute } from '@routes/users.route';
import { KrakenRoute } from '@routes/krakenflex.route'
import { ValidateEnv } from '@utils/validateEnv';
import { ReportRoute } from '@routes/report.route';

ValidateEnv();

const app = new App([new UserRoute(), new AuthRoute(), new KrakenRoute(), new ReportRoute()]);

app.listen();
