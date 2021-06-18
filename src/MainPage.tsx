import React, { useEffect, useState } from 'react'
import 'blip-toolkit/dist/blip-toolkit.css'
import { BlipTable } from './components/BlipTable'
import { BlipTabs } from 'blip-toolkit'
import PropTypes from 'prop-types'
import { sortData } from './util'

const tableContactsModel: Array<Object> = [
  { label: 'Name', key: 'name' },
  { label: 'Group', key: 'group' },
  { label: 'Identity', key: 'identity' },
  { label: 'Source', key: 'source' },
]

const tableThreadsModel: Array<Object> = [
  { label: 'Identity', key: 'identity' },
  { label: 'Last Message', key: 'lastMessage' },
  { label: 'Unread Messages', key: 'unreadMessages' },
]

function MainPage({ service, commomService }) {
  const [application, setApplication] = useState<Object>({})
  const [contacts, setContacts] = useState<Array<any>>([])
  const [threads, setThreads] = useState<Array<any>>([])

  const fetchApi = async () => {
    setContacts(await service.getContacts())
    setApplication(await service.getApplication())
    setThreads(await service.getThreads())
  }

  useEffect(() => {
    commomService.withLoading(async () => {
      new BlipTabs('tab-nav')
      await fetchApi()
    })
  }, [])

  return (
    <div id="tab-nav" className="bp-tabs-container">
      <ul className="bp-tab-nav">
        <li>
          {/* eslint-disable-next-line */}
          <a href="#" data-ref="contacts">
            Contacts
          </a>
        </li>
        <li>
          {/* eslint-disable-next-line */}
          <a href="#" data-ref="threads">
            Threads
          </a>
        </li>
      </ul>
      <div className="bp-tab-content fl w-100" data-ref="contacts">
        <BlipTable
          idKey="identity"
          model={tableContactsModel}
          data={contacts}
          canSelect={false}
          bodyHeight="400px"
          selectedItems={[]}
          onSortSet={(item) => {
            sortData(contacts, item)
          }}
        />
      </div>
      <div className="bp-tab-content fl w-100" data-ref="threads">
        <BlipTable
          idKey="identity"
          model={tableThreadsModel}
          data={threads.map((t) => ({
            ...t,
            lastMessage: t.lastMessage.content,
          }))}
          canSelect={false}
          bodyHeight="400px"
          selectedItems={[]}
          onSortSet={(item) => {
            sortData(contacts, item)
          }}
        />
      </div>
    </div>
  )
}
MainPage.propTypes = {
  service: PropTypes.elementType.isRequired,
  commomService: PropTypes.elementType.isRequired,
}
export default MainPage
