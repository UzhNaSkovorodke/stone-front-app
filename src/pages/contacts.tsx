import { FC } from 'react'
import { ICommonResponse } from 'src/shared/services/pageData/common/common.interface'
import { getCommon } from 'src/shared/services/pageData/common/common'
import { getContacts } from 'src/shared/services/pageData/contacts/contacts'
import { IContactsPageResponse } from 'src/shared/services/pageData/contacts/contacts.interface'
import HeadSeo from 'src/features/headSeo/HeadSeo'
import ContactsPage from 'src/features/contacts/pages/contactsPage'

export interface IContactsProps {
  common: ICommonResponse
  contacts: IContactsPageResponse
}

const Contacts: FC<IContactsProps> = ({ common, contacts }) => {
  return (
    <>
      <HeadSeo />
      <ContactsPage common={common} contacts={contacts} />
    </>
  )
}

export default Contacts

export const getStaticProps = async () => {
  const commonData: ICommonResponse = await getCommon()
  const contactsData: IContactsPageResponse = await getContacts()

  return {
    props: {
      common: commonData,
      contacts: contactsData,
    },
    revalidate: 120,
  }
}
