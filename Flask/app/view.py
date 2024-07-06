from flask import jsonify, request # type: ignore
from app.models import Product

def index():
  return jsonify(
    {
      'mensaje': 'hola Mundo APIS con Flask'
    }
  )


#def get_pending_tasks():
# tasks = Task.get_all_pending()
# return jsonify([task.serialize() for task in tasks])

def get_all_products():
  products = Product.get_list_products()
  return jsonify([Product.serialize() for Product in products])

def get_product(id_product):
  product = Product.get_product_by_id(id_product)
  if not product:
    return jsonify({'message': 'Product not found'}), 404
  return jsonify(product.serialize())

def create_product():
  data = request.json
  new_product = Product(
    nombre=data['nombre'],
    descripcion=data['descripcion'],
    tipo=data['tipo'],
    precio=data['precio'],
    cantidad=data['cantidad'],
    disponible=True
    )
  new_product.save()
  return jsonify({'message': 'Product created successfully'}), 201

def update_product(id_product):
  product = Product.get_product_by_id(id_product)
  if not product:
    return jsonify({'message': 'Product not found'}), 404

  data = request.json
  product.nombre = data['nombre']
  product.descripcion = data['descripcion']
  product.tipo = data['tipo']
  product.precio = data['precio']
  product.cantidad = data['cantidad']
  product.save()
  return jsonify({'message': 'Product updated successfully'})

def disable_product(id_product):
  product = Product.get_product_by_id(id_product)
  if not product:
    return jsonify({'message': 'Product not found'}), 404
  product.delete()
  return jsonify({'message': 'Product disable successfully'})