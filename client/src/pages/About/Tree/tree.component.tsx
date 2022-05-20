import React, { useState } from 'react';
import {
	Tree,
	TreeEventNodeParams,
	TreeNodeClickParams
} from 'primereact/tree';
import TreeNode from 'primereact/treenode';
import { useAppSelector } from '../../../hooks/useTypeSelector';
import { getCategory } from '../../../store/selectors/index.selector';
import allEndpoints from '../../../api';
import TreeHookForm from './TreeHookForm/react-hook-form.component';

function TreeComponent() {
	const { categories } = useAppSelector(getCategory);
	const defaultNodes: TreeNode[] = categories.map((c, i) => ({
		key: i,
		label: c.name,
		data: { name: c.name, parent: null },
		icon: 'pi pi-fw pi-inbox',
		leaf: false
	}));
	const [nodes, setNodes] = useState<TreeNode[]>(defaultNodes);
	const [loading, setLoading] = useState<boolean>(false);
	const [isVisibleForm, setIsVisibleForm] = useState<boolean>(false);
	const [findName, setFindName] = useState<string>();
	const [nodeName, setNodeName] = useState<string>();

	const loadOnExpand = async (event: TreeEventNodeParams) => {
		if (!event.node.children) {
			setLoading(true);
			const node = { ...event.node };
			node.children = [];
			const category = await allEndpoints.category.getOneCategory({
				name: node.label
			});

			node.children = category.cards.map((c, i) => ({
				key: `${event.node.key}-${i}`,
				label: c.name,
				data: { name: c.name, parent: node.data.name }
			}));

			const value = [...nodes];

			value[parseInt(event.node.key as keyof TreeNode, 10)] = node;

			setNodes(value);
			setLoading(false);
		}
	};

	const clickForNode = (e: TreeNodeClickParams) => {
		setIsVisibleForm(true);
		setFindName(e.node.data.name);
		setNodeName(e.node.label);
	};
	const doubleClickForNode = () => {
		setIsVisibleForm(false);
	};
	return (
		<div className="home-page__tree">
			<Tree
				value={nodes}
				onExpand={loadOnExpand}
				onNodeClick={clickForNode}
				onNodeDoubleClick={doubleClickForNode}
				loading={loading}
			/>

			<TreeHookForm
				isVisible={isVisibleForm}
				setIsVisibleForm={setIsVisibleForm}
				findName={findName}
				nodeName={nodeName}
				setNodeName={setNodeName}
				nodes={nodes}
				setNodes={setNodes}
			/>
		</div>
	);
}

export default TreeComponent;
