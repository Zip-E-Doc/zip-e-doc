import { IDocument } from 'app/shared/model/document.model';

export interface ISharedUser {
  id?: number;
  userName?: string | null;
  title?: IDocument | null;
}

export const defaultValue: Readonly<ISharedUser> = {};
