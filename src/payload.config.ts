import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { AuthUsers } from './collections/authUser'
import { Contact } from './collections/contact'
import { TimeSlot } from './collections/timeslot'
import { StudySlot } from './collections/studyslot'
import { Participant } from './collections/participant'
import { Researcher } from './collections/researcher'
import { Experiment } from './collections/experiment'
import { Participant_Study } from './collections/participant_studySlot'
import { Experiment_Researcher } from './collections/experiment_researcher'
import { MessageChannel} from './collections/message_channel'
import { Messages } from './collections/messages'
const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  cors:"*",
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [
    Users,
    Media,
    AuthUsers, 
    TimeSlot,
    StudySlot,
    Contact,
    Participant,
    Researcher,
    Experiment,
    Participant_Study,
    Experiment_Researcher,
    Messages,
    MessageChannel
  ],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || '',
    },
  }),
  sharp,
  //plugins: [MSAuth],
})
