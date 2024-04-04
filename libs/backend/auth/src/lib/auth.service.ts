import { Injectable, Logger } from '@nestjs/common';

import { JwtPayload, verify, sign } from 'jsonwebtoken';
import { hash, compare } from 'bcrypt';

import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { Identity, IdentityDocument } from './identity.schema';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { User, UserDocument } from '../../../features/src/lib/user/user.schema';
import { IAccount } from '@dreams/shared/models';

import { config } from 'dotenv';
config();

@Injectable()
export class AuthService {
    private readonly logger = new Logger(AuthService.name);
    constructor(
        @InjectModel(Identity.name) private identityModel: Model<IdentityDocument>,
        @InjectModel(User.name) private userModel: Model<UserDocument>
    ) {}

    async createUser(name: string, account: IAccount): Promise<string> {
        account.username = name;
        
        const user = new this.userModel(account, hash);
        await user.save();
        return user.id;
      }

    async verifyToken(token: string): Promise<string | JwtPayload> {
        return new Promise((resolve, reject) => {
            verify(token, process.env['JWT_SECRET'] as string, (err, payload) => {
                if (err) reject(err);
                else resolve(payload as JwtPayload);
            })
        })
    }

    async registerUser(username: string, password: string) {
        this.logger.log(process.env['SALT_ROUNDS']);
        const generatedHash = await hash(password, parseInt(process.env['SALT_ROUNDS'] as string));
        this.logger.log(generatedHash);

        const identity = new this.identityModel({username, hash: generatedHash});

        await identity.save();
    }

    async generateToken(username: string, password: string): Promise<string> {
        const identity = await this.identityModel.findOne({ username });
        
        if (!identity) {
            throw new Error("User not found");
        }

        this.logger.log(identity.hash);
        const passwordMatches = await compare(password, identity.hash);
        if (!passwordMatches) {
            throw new Error("Password incorrect");
        }

        const user = await this.userModel.findOne({username: username});

        if (!user) {
            throw new Error("User not found");
        }

        return new Promise((resolve, reject) => {
            sign(
              { username, id: user.id! },
              process.env['JWT_SECRET'] as string,
              (err: any, token: any) => {
                if (err) reject(err);
                else resolve(token);
              }
            );
          });

    }
}
