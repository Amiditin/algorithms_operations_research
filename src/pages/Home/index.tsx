import { Divider, Table, Typography } from 'antd';

import type { ColumnsType } from 'antd/es/table';

import styles from './Home.module.scss';

const { Title } = Typography;

interface IResult {
  id: string;
  algorithm: string;
  case: string;
  iteration: number;
  performance: number;
}

const resultsAlgorithmNaive: IResult[] = [
  { id: '1', algorithm: 'naive', case: 'bad_1', iteration: 9, performance: 0.008699953556060791 },
  { id: '2', algorithm: 'naive', case: 'bad_2', iteration: 91, performance: 0.030000030994415283 },
  { id: '3', algorithm: 'naive', case: 'bad_3', iteration: 901, performance: 0.11100000143051147 },
  { id: '4', algorithm: 'naive', case: 'bad_4', iteration: 4001, performance: 0.6631999611854553 },
  { id: '5', algorithm: 'naive', case: 'good_1', iteration: 600, performance: 0.04969996213912964 },
  { id: '6', algorithm: 'naive', case: 'good_2', iteration: 615, performance: 0.04689997434616089 },
  { id: '7', algorithm: 'naive', case: 'good_3', iteration: 1632, performance: 0.1243999600410461 },
  { id: '8', algorithm: 'naive', case: 'good_4', iteration: 9548, performance: 2.5802000164985657 },
];

const resultsALgorithmBoyerMoorHorspool: IResult[] = [
  { id: '1', algorithm: 'bmh', case: 'bad_1', iteration: 9, performance: 0.014900028705596924 },
  { id: '2', algorithm: 'bmh', case: 'bad_2', iteration: 91, performance: 0.0591999888420105 },
  { id: '3', algorithm: 'bmh', case: 'bad_3', iteration: 901, performance: 0.10670000314712524 },
  { id: '4', algorithm: 'bmh', case: 'bad_4', iteration: 4001, performance: 0.5760000348091125 },
  { id: '5', algorithm: 'bmh', case: 'good_1', iteration: 50, performance: 0.14680004119873047 },
  { id: '6', algorithm: 'bmh', case: 'good_2', iteration: 18, performance: 0.02390003204345703 },
  { id: '7', algorithm: 'bmh', case: 'good_3', iteration: 40, performance: 0.05750000476837158 },
  { id: '8', algorithm: 'bmh', case: 'good_4', iteration: 392, performance: 0.07429999113082886 },
];

const columns: ColumnsType<IResult> = [
  {
    title: 'Тест',
    dataIndex: 'case',
    key: 'case',
  },
  {
    title: 'Итерации',
    dataIndex: 'iteration',
    key: 'iteration',
    sorter: (a, b) => (a.iteration > b.iteration ? 1 : -1),
  },
  {
    title: 'Время мс.',
    dataIndex: 'performance',
    key: 'performance',
    sorter: (a, b) => (a.performance > b.performance ? 1 : -1),
  },
];

export const Home: React.FC = () => {
  return (
    <div className={styles.home_page}>
      <Title level={2}>Лабораторная работа 1</Title>
      <Divider />
      <Title level={3}>Наивный алгоритм</Title>
      <Table
        columns={columns}
        dataSource={resultsAlgorithmNaive}
        rowKey={(record) => record.id}
        pagination={false}
      />
      <Divider />
      <Title level={3}>Алгоритм Бойера-Мура-Хорспула</Title>
      <Table
        columns={columns}
        dataSource={resultsALgorithmBoyerMoorHorspool}
        rowKey={(record) => record.id}
        pagination={false}
      />
    </div>
  );
};
