import {Module} from '@nestjs/common';
import {UserModule} from './user/user.module';
import {AuthModule} from '../auth/auth.module';
import {CardTypeModule} from "./card-type/card-type.module";
import {RoleModule} from "./role/role.module";
import {SubjectModule} from "./subject/subject.module";

@Module({
    imports: [UserModule, AuthModule, CardTypeModule, RoleModule, SubjectModule],
})
export class AppServiceModule {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    constructor() {
    }
}
