import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from './users/users.module';
import { User } from './users/users.model';
import { AuthModule } from './auth/auth.module';
import { TransactionsModule } from './transactions/transactions.module';
import { Transaction } from './transactions/transactions.model';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env`,
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: +process.env.POSTGRES_PORT,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      dialectOptions: {
        rejectUnauthorized: true,
        ca: `-----BEGIN CERTIFICATE-----
MIIEQTCCAqmgAwIBAgIUCH71G1RSxhA8owIZi55hqKBr5D0wDQYJKoZIhvcNAQEM
BQAwOjE4MDYGA1UEAwwvYjIxMDVkOWYtNzU4Ny00ZjgxLTg3ZDEtM2Y0ZjdmZDgz
NDE0IFByb2plY3QgQ0EwHhcNMjQwODEyMTEwNzUzWhcNMzQwODEwMTEwNzUzWjA6
MTgwNgYDVQQDDC9iMjEwNWQ5Zi03NTg3LTRmODEtODdkMS0zZjRmN2ZkODM0MTQg
UHJvamVjdCBDQTCCAaIwDQYJKoZIhvcNAQEBBQADggGPADCCAYoCggGBAKMT3uiG
oQQbyU92c4Ir3GRRxbmFoRbrDfXTw8ZneWEf3gt9Vek6WDqA2Er7GAbvmeiFVr8w
Nm7PGF3K2Z7UcMWV/0ltsyV5KV0Vk6egEkUtR9jNjgVTAmx/i34OJcD9pmD+j9oS
xIe3nspMqxSaf1xoPJuvBMqmy3NO1lbwiSud/MXGULW57TMOlafWs429s89tj+zX
iLDcRC8w95hTTgj4Y/yoRT+2Q+TZBzsj0reT0367Tc82e1E1mpb5P1nIuz8nIzhG
00Jxx3+LRjGKdt/+g84C9EjHViMdALlRP3pjLGwdbtr79GpEHjGJDweptLOIu4kP
keKiSq/PHOBSGx/1GNmqQ6gC4/vGbwNo/t8faYQ9cprvt2koA5RHdw3pivsNfIDn
O40n8m9xXXRjsxJ3t6tpog329zxXx2MMzKFvc0kug1meMOfLAnmK5G3xE8kb4Kjr
iu+m0t8V0tTv+L8m1NyWIaKdYGuoQaevsWhIgSwKyTXgGRR/aXhAdhD8IwIDAQAB
oz8wPTAdBgNVHQ4EFgQU77tp82vAVDc3zqo8Mbj6Zh9/jtwwDwYDVR0TBAgwBgEB
/wIBADALBgNVHQ8EBAMCAQYwDQYJKoZIhvcNAQEMBQADggGBAJHagsTTIgQDm33D
tJrn5OuZlq1SK/9zU3M/daOk8Iywya4UqkxZbaeR3OxxOdryEZJbq3IN3S5EDOn0
78AoPf/KuYijnS8KofcCNjGyhcSIdkXUeeTs5yWYrfQ3GY0oeaneCBD/L9EhtOZy
qtk7SeIu4v3K4ErNJ6sh/lpUWmYIWXL2CFMvQA97D+GsiOoI8UZT6rYdHQ5OFMZI
ZyGG5J2X11bu+iGKHFoqmi1h7dTArITY2/9jrBdPWLFLlrLvu7O6hL2ksTIWsglB
MD56xZSRcrPRtLxKjbdCRcWvd/n/7VA7BODqKJd0FXgQJAE5fzAUO9A++oHvBgmv
jh9ge5bI87vP6nqpKHiJK+fHkVIx0e+wzj+YFRLdRDalF0jOH3HflTb4KeKD86qr
b/7zt3lYlh3vu24KRryaTjpzw4EDOIAc8aVW8UX7UDtvc/yziAbL2/psZviHsjzo
PD4S4tnLAnh5eg0G53oZuLKaHDCWvPQ0M85CjiX6hzE2gvSFmw==
-----END CERTIFICATE-----`,
      },
      models: [User, Transaction],
      autoLoadModels: true,
    }),
    UsersModule,
    AuthModule,
    TransactionsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
