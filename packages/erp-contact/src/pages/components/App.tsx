/**
 * Copyright © All rights reserved 2022
 * Infinisoft Inc.
 * www.infini-soft.com
 * 
 * Micro App Implementation should start in this file
 * This is a CRUD template example
 */

import { useOperations } from '@/hooks/useOperations';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable, { ActionType } from '@ant-design/pro-table';
import { CustomEventListener, off, on } from '@infini-soft/utils/lib/Events';
import React, {
    useEffect,
    useRef
} from 'react';
import icConfig from '../../../config/icConfig';
import { columns } from './Columns';
// import Create from './Create';
import Filter from './Filter';
import styles from './index.less';
import Read from './Read';
import Search from './Search';
import Update from './Update';
import Createmodal from './Createmodal'

const App = () => {
  const actionRef = useRef<ActionType>()
  const { data, runRequest, handleSearch, handleFilter } = useOperations();

  const reloadEventHandler = async () => {
    await runRequest()
    actionRef.current?.reload()
  }
  const searchEventHandler: CustomEventListener<string> = async (payload) => {
    await handleSearch(payload.detail)
    actionRef.current?.reload()
  }
  const filterEventHandler: CustomEventListener<string> = async (payload) => {
    await handleFilter(payload.detail)
    actionRef.current?.reload()
  }

  useEffect(() => {
    on('ui.list.reload', reloadEventHandler)
    on('ui.list.search', searchEventHandler)
    on('ui.list.filter', filterEventHandler)

    return () => {
      off('ui.list.reload', reloadEventHandler)
      off('ui.list.search', searchEventHandler)
      off('ui.list.filter', filterEventHandler)
    }
  }, [reloadEventHandler, searchEventHandler])

  return (
    <PageContainer title={icConfig.title} className={styles.root}>
      <ProTable
        actionRef={actionRef}
        rowKey="SK"
        search={false}
        toolBarRender={() => [
          <Filter />,
          <Search />,
          // <Create />,
          <Createmodal />
        ]}
        pagination={{
          pageSize: 10,
        }}
        dataSource={data}
        columns={columns}
      />

      <Update />
      <Read />
    </PageContainer >
  );
};

export default App;
