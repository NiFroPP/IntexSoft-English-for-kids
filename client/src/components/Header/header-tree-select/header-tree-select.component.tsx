import React, { useState } from 'react';
import { TreeSelect } from 'primereact/treeselect';
import { useNavigate } from 'react-router-dom';

import { useAppSelector } from '../../../hooks/useTypeSelector';
import { getCategory, getUser } from '../../../store/selectors/index.selector';
import PATHS from '../../../models/enum/paths.enum';

import './header-tree-select.component.scss';

export default function HeaderTreeSelect() {
	const [selectedNodeKey, setSelectedNodeKey] = useState(null);
	const navigate = useNavigate();
	const { favoriteCategories } = useAppSelector(getUser);
	const { categories } = useAppSelector(getCategory);

	const favoriteCategoriesWithName = categories.filter((category) =>
		favoriteCategories.includes(category._id)
	);

	const nodes = favoriteCategoriesWithName.map((c) => ({
		key: c.name,
		label: c.name,
		icon: 'pi pi-fw pi-star-fill'
	}));

	const onSelectedNodeKey = (e: any) => {
		setSelectedNodeKey(e.value);
		navigate(`${PATHS.CATEGORY}/${e.value}`);
	};

	return (
		<div>
			<TreeSelect
				value={selectedNodeKey}
				options={nodes}
				onChange={onSelectedNodeKey}
				placeholder="Your favorite categories"
			/>
		</div>
	);
}
