from flask import Flask
from flask_cors import CORS # type: ignore
from app.view import *
from app.database import *

app = Flask(__name__)

#Rutas
app.route('/api/products/list', methods=['GET'])(get_all_products)
app.route('/api/products/fetch/<int:id_product>', methods=['GET'])(get_product)
app.route('/api/products/create', methods=['POST'])(create_product)
app.route('/api/products/update/<int:id_product>', methods=['PUT'])(update_product)
app.route('/api/products/disable/<int:id_product>', methods=['DELETE'])(disable_product)

#Database
create_table_productos()
init_app(app)
CORS(app)

#test_connection()

if __name__ == '__main__':
  app.run(debug=True)