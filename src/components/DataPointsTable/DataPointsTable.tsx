import { useState } from 'react';
import { Table, ScrollArea } from '@mantine/core';
import useStyles from './styles';
import { DataPoint } from '../../services/data-points';
import { DateTime } from 'luxon';

interface DataPointsTableProps {
  dataPoints: DataPoint[];

  isNumeric: boolean;
}

const DataPointsTable = ({ dataPoints, isNumeric }: DataPointsTableProps) => {
  const { classes, cx } = useStyles();
  const [scrolled, setScrolled] = useState(false);

  const rows = dataPoints.map((dataPoint, index) => (
    <tr key={index}>
      <td>
        {DateTime.fromISO(dataPoint.timestamp).toLocaleString(DateTime.DATETIME_SHORT_WITH_SECONDS)}
      </td>
      <td>
        {isNumeric ? Number(dataPoint.value).toFixed(2) : String(dataPoint.value)}
      </td>
    </tr>
  ));

  return (
    <ScrollArea
      sx={{ height: '90%', width: '100%' }}
      onScrollPositionChange={({ y }) => setScrolled(y !== 0)}
    >
      <Table>
        <thead className={cx(classes.header, { [classes.scrolled]: scrolled })}>
          <tr>
            <th>Timestamp</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </ScrollArea>
  );
};

export default DataPointsTable;