import React from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
const SelectOptions = (props) => {
    const { data, name } = props
    let title = ''
    if (name == 'author')
        title = "Authors"
    else
        title = 'Publishers'
    return (
        <div>
            <InputLabel htmlFor="controlled-open-select">{title}</InputLabel>
            &nbsp;

                <Select
                key={name}
                name={name}
                onChange={props.onChange}
                value={props.value}
            >
                {
                    data.map(item => {
                        return (
                            <MenuItem value={item.name} key={item.id}>{item.name}</MenuItem>
                        )
                    })
                }
            </Select>
        </div>
    )
}
export default SelectOptions;