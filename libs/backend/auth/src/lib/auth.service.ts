import { Injectable } from '@nestjs/common';

import { JwtPayload, verify, sign } from 'jsonwebtoken';
import { hash, compare } from 'bcrypt';

import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { Identity, IdentityDocument } from './identity.schema';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { User, UserDocument } from '../../../features/src/lib/user/user.schema';
import { environment } from '@dreams/shared/services'

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(Identity.name) private identityModel: Model<IdentityDocument>,
        @InjectModel(User.name) private userModel: Model<UserDocument>
    ) {}

    async createUser(name: string, emailAddress: string): Promise<string> {
        const user = new this.userModel({name, emailAddress});
        await user.save();
        return user.id;
      }

    async verifyToken(token: string): Promise<string | JwtPayload> {
        return new Promise((resolve, reject) => {
            verify(token, environment.JWT_SECRET, (err, payload) => {
                if (err) reject(err);
                else resolve(payload as JwtPayload);
            })
        })
    }

    async registerUser(username: string, password: string, emailAddress: string) {
        const generatedHash = await hash(password, environment.SALT_ROUNDS);

        const identity = new this.identityModel({username, hash: generatedHash, emailAddress});

        await identity.save();
    }

    async generateToken(username: string, password: string): Promise<string> {
        const identity = await this.identityModel.findOne({username});

        if (!identity || !(await compare(password, identity.hash))) throw new Error("user not authorized");

        const user = await this.userModel.findOne({name: username});

        if (!user) {
            throw new Error("User not found");
        }

        return new Promise((resolve, reject) => {
            sign(
              { username, id: user.id! },
              environment.JWT_SECRET,
              (err: any, token: any) => {
                if (err) reject(err);
                else resolve(token);
              }
            );
          });

    }
}
