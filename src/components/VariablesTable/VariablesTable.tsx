import { useState } from 'react';
import { Table, ScrollArea, Anchor } from '@mantine/core';
import useStyles from './styles';
import { Variable } from '../../services/variables';
import { Link } from 'wouter';

interface VariablesTableProps {
  variables: Variable[];
}

const VariablesTable = ({ variables }: VariablesTableProps) => {
  const { classes, cx } = useStyles();
  const [scrolled, setScrolled] = useState(false);

  const rows = variables.map((variable) => (
    <tr key={variable.label}>
      <td>
        <Link to={`/variables/${variable.id}`}>
          <Anchor>
            {variable.name}
          </Anchor>
        </Link>
      </td>
      <td>{variable.description || 'No description'}</td>
      <td>{variable.label}</td>
      <td>{variable.variableType}</td>
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
            <th>Name</th>
            <th>Description</th>
            <th>Label</th>
            <th>Type</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </ScrollArea>
  );
};

export default VariablesTable;