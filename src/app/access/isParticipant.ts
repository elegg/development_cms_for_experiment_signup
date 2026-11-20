import { Access } from "payload/config";

export const isParticipant: Access = ({ req: { user } }) => {return true}