import { JwtPayloadCreate } from './jwtPayloadCreate.type';

export type JwtPayloadData = JwtPayloadCreate & { refreshToken: string };
