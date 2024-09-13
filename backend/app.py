# app.py
from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3

app = Flask(__name__)
CORS(app)

def init_db():
    conn = sqlite3.connect('tasks.db')
    c = conn.cursor()
    c.execute('''CREATE TABLE IF NOT EXISTS tasks
                 (id INTEGER PRIMARY KEY AUTOINCREMENT,
                  title TEXT NOT NULL,
                  completed BOOLEAN NOT NULL)''')
    conn.commit()
    conn.close()

@app.route('/api/tasks', methods=['GET'])
def get_tasks():
    conn = sqlite3.connect('tasks.db')
    c = conn.cursor()
    c.execute('SELECT * FROM tasks')
    tasks = [{'id': row[0], 'title': row[1], 'completed': bool(row[2])} for row in c.fetchall()]
    conn.close()
    return jsonify(tasks)

@app.route('/api/tasks', methods=['POST'])
def add_task():
    task = request.json
    conn = sqlite3.connect('tasks.db')
    c = conn.cursor()
    c.execute('INSERT INTO tasks (title, completed) VALUES (?, ?)',
              (task['title'], task['completed']))
    conn.commit()
    task_id = c.lastrowid
    conn.close()
    return jsonify({'id': task_id, **task}), 201

@app.route('/api/tasks/<int:task_id>', methods=['PUT'])
def update_task(task_id):
    task = request.json
    conn = sqlite3.connect('tasks.db')
    c = conn.cursor()
    c.execute('UPDATE tasks SET title = ?, completed = ? WHERE id = ?',
              (task['title'], task['completed'], task_id))
    conn.commit()
    conn.close()
    return jsonify({'id': task_id, **task})

@app.route('/api/tasks/<int:task_id>', methods=['DELETE'])
def delete_task(task_id):
    conn = sqlite3.connect('tasks.db')
    c = conn.cursor()
    c.execute('DELETE FROM tasks WHERE id = ?', (task_id,))
    conn.commit()
    conn.close()
    return '', 204

if __name__ == '__main__':
    init_db()
    app.run(debug=True, host='0.0.0.0')