import json
from django.contrib.auth.models import User
from django.urls import reverse

from rest_framework.authtoken.models import Token
from rest_framework.test import APITestCase
from todos.models import Todo
from todos.serializers import TodoSerializer


class BaseTestClass(APITestCase):
    url = reverse('todo-list')

    def setUp(self):
        self.username = 'john'
        self.email = 'john@snow.com'
        self.password = 'you_know_nothing'
        self.user = User.objects.create_user(
            self.username, self.email, self.password,
        )
        self.token = Token.objects.create(user=self.user)
        self.login()

    def login(self):
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)


class TodoListCreate(BaseTestClass):
    url = reverse('todo-list')

    def test_create_todo(self):
        response = self.client.post(self.url, {'title': 'Clean the room!'})
        self.assertEqual(201, response.status_code)

    def test_user_todos(self):
        Todo.objects.create(owner=self.user, title='Clean the desktop!')
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, 200)
        self.assertTrue(
            len(response.data) == Todo.objects.count()
        )


class TodoGetUpdateDelete(BaseTestClass):
    def setUp(self):
        super().setUp()
        self.todo = Todo.objects.create(
            title='Clean the trash!', owner=self.user,
        )
        self.url = reverse("todo-detail", kwargs={"pk": self.todo.pk})

    def test_get_todo(self):
        response = self.client.get(self.url)
        self.assertEqual(200, response.status_code)
        expected_todo = TodoSerializer(self.todo).data
        self.assertEqual(response.data, expected_todo)

    def test_delete_todo(self):
        todo_id = self.todo.id
        response = self.client.delete(self.url)
        self.assertEqual(204, response.status_code)
        todo_query = Todo.objects.filter(pk=self.todo.id)
        self.assertEqual(
            todo_query.count(), 0
        )

    def test_update_todo(self):
        new_title = 'clean the /tmp!'
        response = self.client.patch(self.url, {'title': new_title})
        self.assertEqual(200, response.status_code)
        self.assertEqual(
            response.data['title'], new_title
        )
