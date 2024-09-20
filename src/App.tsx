import { FormEvent, useState, useRef } from 'react'
import { Container, Stack, Button, Table, Modal, Form } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

type Product = {
	id: number
	name: string
	description: string
	price: number
	available: string
}

export default function App() {
	const [productId, setProductId] = useState<number>(0)
	const [products, setProducts] = useState<Product[]>([])
	const [showModal, setShowModal] = useState<boolean>(false)

	const name = useRef<HTMLInputElement | null>(null)
	const description = useRef<HTMLInputElement | null>(null)
	const price = useRef<HTMLInputElement | null>(null)
	const available = useRef<HTMLInputElement | null>(null)

	const handleShowModal = (show: boolean) => setShowModal(show)

	const handleResetForm = () => {
		if (name.current) { name.current.value = '' }
		if (description.current) { description.current.value = '' }
		if (price.current) { price.current.value = ''}
		if (available.current) { available.current.checked = false }
	}

	const handleAddProduct = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		if (
			name.current?.value === '' ||
			description.current?.value === '' ||
			price.current?.value === ''
		) { 
			return alert('You must provie valid product information !') 
		}

		setProductId(productId + 1)

		setProducts([...products, {
			id: productId,
			name: name.current?.value as string,
			description: description.current?.value as string,
			price: parseInt(price.current?.value as string),
			available: available.current?.checked as boolean ? 'Yes' : 'No'
		}])

		handleResetForm()
	}

	return <Container>
		<Stack direction='horizontal' className='my-3'>
			<h1>Products</h1>
			<Button variant="primary" className='ms-auto' onClick={() => handleShowModal(true)}>Add product</Button>
		</Stack>

		<Table striped bordered hover>
			<thead>
				<tr>
					<th>#</th>
					<th>Name</th>
					<th>Description</th>
					<th>Price</th>
					<th>Available ?</th>
				</tr>
			</thead>
			<tbody>
				{products.map(product => {
					return (<tr key={product.id}>
						<td>{product.id}</td>
						<td>{product.name}</td>
						<td>{product.description}</td>
						<td>{product.price}</td>
						<td>{product.available}</td>
					</tr>)
				})}
			</tbody>
		</Table>

		<Modal show={showModal} onHide={() => handleShowModal(false)}>
			<Modal.Header>
				<Modal.Title>Add product</Modal.Title>
			</Modal.Header>

			<Form onSubmit={handleAddProduct}>
				<Modal.Body>
					<Form.Group className="mb-3" controlId="name">
						<Form.Label>Name</Form.Label>
						<Form.Control type="text" placeholder="Enter product name" ref={name} />
					</Form.Group>

					<Form.Group className="mb-3" controlId="description">
						<Form.Label>Description</Form.Label>
						<Form.Control type="text" placeholder="Enter product description" ref={description} />
					</Form.Group>

					<Form.Group className="mb-3" controlId="price">
						<Form.Label>Price</Form.Label>
						<Form.Control type="text" placeholder="Enter product price" ref={price} />
					</Form.Group>

					<Form.Check 
						type="checkbox"
						id="available"
						ref={available}
						label="Available"
					/>
				</Modal.Body>

				<Modal.Footer>
					<Button variant="secondary" onClick={() => handleShowModal(false)} id="close">
						Close
					</Button>
					<Button variant="primary" type='submit'>
						Add
					</Button>
					<Button variant="primary" type='submit' onClick={() => handleShowModal(false)}>
						Add and close
					</Button>
				</Modal.Footer>
			</Form>
		</Modal>
	</Container>
}
