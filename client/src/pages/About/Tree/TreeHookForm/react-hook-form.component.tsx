import React, { useEffect, useMemo, useState } from 'react';
import {
	useForm,
	Controller,
	UnpackNestedValue,
	FieldValues
} from 'react-hook-form';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Checkbox } from 'primereact/checkbox';
import { Dialog } from 'primereact/dialog';
import { classNames } from 'primereact/utils';
import TreeNode from 'primereact/treenode';
import allEndpoints from '../../../../api';
import { useActions } from '../../../../hooks/useActions';

type OurNode = {
	name: string;
	parent: string;
	dataForUpd: { name: string };
};

type ReactHookFormProps = {
	isVisible: boolean;
	setIsVisibleForm: (e: boolean) => void;
	nodeName?: string;
	setNodeName: (nodeName: string) => void;
	findName?: string;
	nodes: TreeNode[];
	setNodes: (nodes: TreeNode[]) => void;
};

export function TreeHookForm({
	isVisible,
	setIsVisibleForm,
	nodeName,
	setNodeName,
	findName,
	nodes,
	setNodes
}: ReactHookFormProps) {
	const defaultValues = useMemo(() => {
		return {
			name: `${nodeName}`,
			accept: false
		};
	}, [nodeName]);
	const { updateCategoriesAC } = useActions();

	// console.log('render form!');
	// console.log('nodeName - ', nodeName);
	// console.log('findName - ', findName);
	const [showMessage, setShowMessage] = useState(false);

	const {
		control,
		formState: { errors },
		handleSubmit,
		reset
	} = useForm({ defaultValues });

	useEffect(() => {
		reset(defaultValues);
	}, [nodeName]);

	const onSubmit = async (data: UnpackNestedValue<FieldValues>) => {
		let ourNode = {} as OurNode;

		const traverse = (node: TreeNode) => {
			if (node.children) {
				node.children.forEach(traverse);
			}
			if (node.data.name === findName) {
				ourNode = { ...node.data, dataForUpd: { name: data.name } };
				node.label = data.name;
				return node;
			}
			return node;
		};

		const newNodes = nodes.map((n: TreeNode) => traverse(n));

		if (!ourNode.parent) {
			await allEndpoints.adminPanel.updateCategory(ourNode.name, {
				updName: ourNode.dataForUpd.name
			});
			setNodeName(ourNode.dataForUpd.name);
			updateCategoriesAC({
				newName: ourNode.dataForUpd.name,
				name: ourNode.name
			});
		} else {
			await allEndpoints.adminPanel.updateCard(ourNode.parent, ourNode.name, {
				updCard: { name: ourNode.dataForUpd.name }
			});
		}

		setNodes(newNodes);
		setShowMessage(true);

		reset();
	};

	const dialogFooter = (
		<div className="flex justify-content-center">
			<Button
				label="OK"
				className="p-button-text"
				autoFocus
				onClick={() => {
					setShowMessage(false);
					setIsVisibleForm(false);
				}}
			/>
		</div>
	);

	return (
		<div>
			{isVisible ? (
				<div className="form-demo">
					<Dialog
						visible={showMessage}
						onHide={() => setShowMessage(false)}
						position="top"
						footer={dialogFooter}
						showHeader={false}
						breakpoints={{ '960px': '80vw' }}
						style={{ width: '30vw' }}>
						<div className="flex justify-content-center flex-column pt-6 px-3">
							<i
								className="pi pi-check-circle"
								style={{ fontSize: '5rem', color: 'var(--green-500)' }}
							/>
							<h5>Change Successful!</h5>
						</div>
					</Dialog>

					<div className="flex justify-content-center">
						<div className="card">
							<h5 className="text-center">Change your name - {nodeName}</h5>
							<form onSubmit={handleSubmit(onSubmit)} className="p-fluid">
								<div className="field">
									<span className="p-float-label">
										<Controller
											name="name"
											control={control}
											rules={{ required: 'Name is required.' }}
											render={({ field, fieldState }) => (
												<InputText
													id={field.name}
													{...field}
													autoFocus
													className={classNames({
														'p-invalid': fieldState.invalid
													})}
												/>
											)}
										/>
										<label
											htmlFor="name"
											className={classNames({ 'p-error': errors.name })}>
											Name*
										</label>
									</span>
								</div>

								<div className="field-checkbox">
									<Controller
										name="accept"
										control={control}
										rules={{ required: true }}
										render={({ field, fieldState }) => (
											<Checkbox
												inputId={field.name}
												onChange={(e) => field.onChange(e.checked)}
												checked={field.value}
												className={classNames({
													'p-invalid': fieldState.invalid
												})}
											/>
										)}
									/>
									<label
										htmlFor="accept"
										className={classNames({ 'p-error': errors.accept })}>
										I agree to the terms and conditions*
									</label>
								</div>

								<Button type="submit" label="Submit" className="mt-2" />
							</form>
						</div>
					</div>
				</div>
			) : null}
		</div>
	);
}
export default TreeHookForm;
