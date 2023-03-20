import React, {
  useState,
} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Button from 'terra-button';
import classNamesBind from 'classnames/bind';
import ThemeContext from 'terra-theme-context';
import styles from './Exercise.module.scss';
import Table, {
  Utils,
} from 'terra-table';

const mockData = [
  {
    key: 'unique-0',
    toggleText: 'Toggle Power Row 0',
    discloseText: 'Power Row 0 - Details',
    primaryIndex: 1,
    cells: [
      {
        key: 'unique-0-0',
        title: 'Dave Smith',
      },
      {
        key: 'unique-0-1',
        title: '123 Adams Drive',
      },
      {
        key: 'unique-0-2',
        title: '123-456-7890',
      },
      {
        key: 'unique-0-3',
        title: 'dave.smith@gmail.com',
      },
    ],
  },
  {
    key: 'unique-1',
    toggleText: 'Toggle Power Row 1',
    discloseText: 'Power Row 1 - Details',
    primaryIndex: 1,
    cells: [
      {
        key: 'unique-1-0',
        title: 'Michael Smith',
      },
      {
        key: 'unique-1-1',
        title: '345 Raymond Road',
      },
      {
        key: 'unique-1-2',
        title: '111-222-3333',
      },
      {
        key: 'unique-1-3',
        title: 'michael.smith@gmail.com',
      },
    ],
  },
  {
    key: 'unique-2',
    toggleText: 'Toggle Power Row 2',
    discloseText: 'Power Row 2 - Details',
    primaryIndex: 1,
    cells: [
      {
        key: 'unique-2-0',
        title: 'Jack Smith',
      },
      {
        key: 'unique-2-1',
        title: '567 Drive Street',
      },
      {
        key: 'unique-2-2',
        title: '222-333-4444',
      },
      {
        key: 'unique-2-3',
        title: 'jack.smith@gmail.com',
      },
    ],
  },
  {
    key: 'unique-3',
    toggleText: 'Toggle Power Row 3',
    discloseText: 'Power Row 3 - Details',
    primaryIndex: 1,
    cells: [
      {
        key: 'unique-3-0',
        title: 'Tom Smith',
      },
      {
        key: 'unique-3-1',
        title: '789 Bay Road',
      },
      {
        key: 'unique-3-2',
        title: '555-666-7777',
      },
      {
        key: 'unique-3-3',
        title: 'tom.smith@gmail.com',
      },
    ],
  },
  {
    key: 'unique-4',
    toggleText: 'Toggle Power Row 4',
    discloseText: 'Power Row 4 - Details',
    primaryIndex: 1,
    cells: [
      {
        key: 'unique-4-0',
        title: 'Paul Smith',
      },
      {
        key: 'unique-4-1',
        title: '123 Adams Drive',
      },
      {
        key: 'unique-4-2',
        title: '777-888-9999',
      },
      {
        key: 'unique-4-3',
        title: 'paul.smith@gmail.com',
      },
    ],
  },
];

const createCell = cell => ({ key: cell.key, children: cell.title });
const createCellsForRow = cells => cells.map(cell => createCell(cell));


const cx = classNamesBind.bind(styles);

const propTypes = {
  /**
   * Content to be displayed as the name
   */
  name: PropTypes.string,
};

const defaultProps = {
  name: 'default',
};

const Exercise = ({ name, ...customProps }) => {
  const theme = React.useContext(ThemeContext);
  const ExerciseClassNames = classNames(
    cx([
    'exercise',
    theme.className,
  ]),
    customProps.className,
  );

  const [checkedKeys, setCheckedKeys] = useState([]);
  const [allChecked, setAllChecked] = useState(false);
  const rowCount = mockData.length; // This value needs to exclude or account for section headers

  const handleRowCheckAction = (event, metaData) => {
    event.preventDefault();

    const newKeys = Utils.toggleArrayValue(checkedKeys, metaData.key);
    const isMax = newKeys.length === rowCount;
    setAllChecked(allChecked ? !isMax : isMax);
    setCheckedKeys(isMax ? [] : newKeys);
  };

  const handleHeaderCheckAction = () => {
    setAllChecked(!!checkedKeys.length || !allChecked);
    setCheckedKeys([]);
  };

  const getIsRowChecked = (key) => {
    if (checkedKeys.length) {
      const isPresent = checkedKeys.indexOf(key) >= 0;
      return allChecked ? !isPresent : isPresent;
    }
    return allChecked;
  };

  const createRow = rowData => (
    {
      key: rowData.key,
      cells: createCellsForRow(rowData.cells),
      toggleAction: {
        metaData: { key: rowData.key },
        onToggle: handleRowCheckAction,
        toggleLabel: rowData.toggleText,
        isToggled: getIsRowChecked(rowData.key),
      },
      discloseAction: {
        discloseLabel: rowData.discloseText,
        discloseCellIndex: rowData.primaryIndex,
      },
    }
  );

  const createRows = data => data.map(childItem => createRow(childItem));

  let status = 'empty';
  if (checkedKeys.length) {
    status = 'indeterminate';
  } else if (allChecked) {
    status = 'checked';
  }

  return (<div {...customProps} className={ExerciseClassNames}>

     <Button text="Select All" onClick={handleHeaderCheckAction} >
        
      </Button>
      <Table
      summaryId="check-table"
      summary="This table has rows that can be batch selected with the checkbox or disclosed for further details."
      numberOfColumns={4}
      cellPaddingStyle="standard"
      rowStyle="disclose"
      checkStyle="toggle"
      dividerStyle="horizontal"
      headerData={{
        selectAllColumn: {
          checkStatus: status,
          checkLabel: 'Batch Selection',
          onCheckAction: handleHeaderCheckAction,
        },
        cells: [
          { key: 'cell-0', id: 'toggle-0', children: 'Name' },
          { key: 'cell-1', id: 'toggle-1', children: 'Address' },
          { key: 'cell-2', id: 'toggle-2', children: 'Phone Number' },
          { key: 'cell-3', id: 'toggle-3', children: 'Email Id' },
        ],
      }}
      bodyData={[{
        rows: createRows(mockData),
      }]}
    />
  </div>);
};

Exercise.propTypes = propTypes;
Exercise.defaultProps = defaultProps;

export default Exercise;
