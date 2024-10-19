import { RowDataPacket } from "mysql2/promise";

export interface Note {
  title: string;
  content: string;
}

export interface NoteRow extends RowDataPacket, Note {}
