import dayjs from 'dayjs';
import { IUser } from 'app/shared/model/user.model';

export interface IDocument {
  id?: number;
  documentTitle?: string | null;
  createdDate?: string | null;
  modifiedDate?: string | null;
  s3key?: string | null;
  userName?: IUser | null;
}

export const defaultValue: Readonly<IDocument> = {};
