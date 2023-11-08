import { MainLayout } from 'src/layouts/MainLayout'
import { FC } from 'react'
import { ContactsContent } from 'src/features/contacts/components/ContactsContent/ContactsContent'
import { ContactsMap } from 'src/features/contacts/components/ContactsMap/ContactsMap'
import { IContactsPageResponse } from 'shared/services/pageData/contacts/contacts.interface'
import { ICommonResponse } from 'shared/services/pageData/common/common.interface'

export interface IContactsProps {
  common: ICommonResponse
  contacts: IContactsPageResponse
}

const ContactsPage: FC<IContactsProps> = ({ common, contacts }) => {
  return (
    <MainLayout common={common.data?.attributes}>
      <ContactsContent contacts={contacts.data?.attributes} />

      <div id="map"></div>
      <ContactsMap coordinates={contacts.data?.attributes.coords} />
    </MainLayout>
  )
}
export default ContactsPage
