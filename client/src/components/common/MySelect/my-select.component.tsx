import React from 'react';

import './my-select.component.scss';

export interface SelectOptions {
	value: string;
	name: string;
}

function MySelectComponent({
	value,
	onChange,
	options,
	defaultValue
}: {
	value: string;
	onChange: React.Dispatch<React.SetStateAction<string>>;
	options: SelectOptions[];
	defaultValue: string;
}) {
	return (
		<select
			value={value}
			onChange={(e) => onChange(e.target.value)}
			className="words-sort">
			<option value="" disabled>
				{defaultValue}
			</option>
			{options.map((option) => (
				<option value={option.value} key={option.value}>
					{option.name}
				</option>
			))}
		</select>
	);
}

export default MySelectComponent;
