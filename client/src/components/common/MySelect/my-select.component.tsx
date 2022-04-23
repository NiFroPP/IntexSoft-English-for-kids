import React from 'react';

import './my-select.component.scss';

export interface SelectOptions {
	value: string;
	name: string;
}

function MySelectComponent<T extends string>({
	value,
	onChange,
	options,
	defaultValue
}: {
	value: T;
	onChange: React.Dispatch<React.SetStateAction<T>>;
	options: SelectOptions[];
	defaultValue: T;
}) {
	return (
		<select
			value={value}
			onChange={(e) => onChange(e.target.value as T)}
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
