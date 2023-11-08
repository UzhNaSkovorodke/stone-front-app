import { FC } from 'react'
import classes from './styles.module.scss'
import {
  IContactsBlock,
  IContactsDataAttributes,
} from 'shared/services/pageData/contacts/contacts.interface'

interface IContactsContentProps {
  contacts: IContactsDataAttributes
}

export const ContactsContent: FC<IContactsContentProps> = ({ contacts }) => {
  const contactsInfo: IContactsBlock[] = contacts.contacts_block
  return (
    <section className={classes['section']}>
      <div className={classes['main']}>
        <div className={classes['main__title']}>
          <span>{contacts.title}</span>
        </div>

        <div className={classes['main__description']}>
          <p className={classes['main__phone']}>{contacts.phone.text}</p>
          <p className={classes['main__address']}>{contacts.address}</p>
        </div>
      </div>
      <div className={classes['list']}>
        {contactsInfo &&
          contactsInfo.map((contact) => (
            <div className={classes['list-item']} key={contact.id}>
              <p className={classes['list-item__title']}>{contact.title}</p>
              <div className={classes['list-item__block']}>
                {contact.contact &&
                  contact.contact.map((block) => (
                    <div className={classes['list-item__container']} key={block.id}>
                      <p className={classes['list-item__description']}>{block.text || ''}</p>
                      <a href={block.link.link || ''} className={classes['list-item__email']}>
                        {block.link.text || ''}
                      </a>
                    </div>
                  ))}
              </div>
            </div>
          ))}
      </div>
    </section>
  )
}
