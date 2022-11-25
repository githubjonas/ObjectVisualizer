import React from 'react';

export function ObjectVisualizer(props) {
  const isArray = (obj) => {
    return Array.isArray(obj);
  };

  const isObject = (value) => {
    return value !== null && !isArray(value) && typeof value === "object";
  };

  const sortObjectKeys = (o, priority = []) => {
    let keys = Object.keys(o);

    keys.sort((a, b) => {
      if (priority.includes(a) && priority.includes(b)) {
        return priority.indexOf(a) > priority.indexOf(b) ? 1 : -1;
      }

      if (priority.includes(a)) return -1;
      if (priority.includes(b)) return 1;
      return a > b ? 1 : -1;
    });

    return keys;
  };

  if (isArray(props.data)) {
    return (
      <table className={"ObjectVisualizer-table"}>
        {props.data.map((value) => (
          <tr>
            <td colSpan={2}>
              {isObject(value) || isArray(value) ? (
                <ObjectVisualizer data={value} />
              ) : (
                <span className={"ObjectVisualizer-value"}>{value}</span>
              )}
            </td>
          </tr>
        ))}
      </table>
    );
  }

  return (
    <table className={"ObjectVisualizer-table"}>
      {sortObjectKeys(props.data, props.priority ?? []).map((key) => (
        <tr>
          <td>
            <span className={"ObjectVisualizer-key"}>{key}</span>
          </td>
          <td>
            {isObject(props.data[key]) || isArray(props.data[key]) ? (
              <ObjectVisualizer data={props.data[key]} />
            ) : (
              <span className={"ObjectVisualizer-value"}>
                {props.data[key]}
              </span>
            )}
          </td>
        </tr>
      ))}
    </table>
  );
}

