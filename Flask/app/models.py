from sqlite3 import Cursor
from app.database import get_db

class Product:
  def __init__(self, id_product=None, nombre=None, descripcion=None, tipo=None, precio=None, cantidad=None, disponible=True):
    self.id_product = id_product
    self.nombre = nombre
    self.descripcion = descripcion
    self.tipo = tipo
    self.precio = precio
    self.cantidad = cantidad
    self.disponible = disponible
  
  #@staticmethod
  #def __get_product_by_query(query):
  #  db = get_db()
  #  cursor = db.cursor()
  #  cursor.execute(query)
  #  rows = cursor.fetchall()
  
  #  products = []
  #  for row in rows:
  #    products.append(
  #      Product(
  #        id_product=row[0],
  #        nombre=row[1],
  #        descripcion=row[2],
  #        tipo=row[3],
  #        precio=row[4],
  #        cantidad=row[5],
  #        disponible=row[6]
  #      )
  #    )
  #  cursor.close()
  #  return products
    
  #@staticmethod
  #def get_list_products():
  #  return Product.__get_product_by_query
  #  (
  #    """
  #    SELECT *
  #      FROM productos
  #    ORDER BY nombre
  #    """
  #  )

  @staticmethod
  def get_list_products():
    db = get_db()
    cursor = db.cursor()
    cursor.execute(
      """
      SELECT *
        FROM productos
       ORDER BY nombre
      """
    )
    rows = cursor.fetchall()

    products = []
    for row in rows:
      products.append(
        Product(
          id_product=row[0],
          nombre=row[1],
          descripcion=row[2],
          tipo=row[3],
          precio=row[4],
          cantidad=row[5],
          disponible=row[6]
        )
      )
    cursor.close()
    return products

  @staticmethod
  def get_product_by_id(id_product):
    db = get_db()
    cursor = db.cursor()
    cursor.execute("SELECT * FROM productos WHERE id = %s", (id_product,))
    row = cursor.fetchone()
    cursor.close()
    if row:
      return Product(
        id_product=row[0],
        nombre=row[1],
        descripcion=row[2],
        tipo=row[3],
        precio=row[4],
        cantidad=row[5],
        disponible=row[6]
      )
    return None

  def save(self):
    db = get_db()
    cursor = db.cursor()
    if self.id_product: # Actualizar Producto existente
      cursor.execute(
      """
      UPDATE productos
        SET nombre = %s
          , descripcion = %s
          , tipo = %s
          , precio = %s
          , cantidad = %s
          , disponible = %s
      WHERE id = %s
      """,
      (self.nombre, self.descripcion, self.tipo, self.precio, self.cantidad, self.disponible, self.id_product))
    else: # Crear Producto nuevo
      cursor.execute(
      """
      INSERT
        INTO productos (nombre, descripcion, tipo, precio, cantidad, disponible)
      VALUES (%s, %s, %s, %s, %s, %s)
      """,
      (self.nombre, self.descripcion, self.tipo, self.precio, self.cantidad, self.disponible))
      self.id_product = cursor.lastrowid
    db.commit()
    cursor.close()

  def delete(self):
    db = get_db()
    cursor = db.cursor()
    cursor.execute("UPDATE productos SET disponible = false WHERE id = %s", (self.id_product,))
    db.commit()
    cursor.close()

  def serialize(self):
    return {
      'id': self.id_product,
      'nombre': self.nombre,
      'descripcion': self.descripcion,
      'tipo': self.tipo,
      'precio': self.precio,
      'cantidad': self.cantidad,
      'disponible': self.disponible
    }