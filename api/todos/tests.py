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
        self.username = 'tim'
        self.email = 'tim@berton.com'
        self.password = 'you_know_nothing'
        self.user = User.objects.create_user(
            self.username, self.email, self.password,
        )
        self.token = Token.objects.create(user=self.user)
        self.login(self.token)

    def login(self, token):
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + token.key)

    def logout(self):
        self.client.logout()


class TodoListCreate(BaseTestClass):
    url = reverse('todo-list')

    def test_create_todo(self):
        response = self.client.post(self.url, {'title': 'Clean the room!'})
        self.assertEqual(201, response.status_code)
        self.assertEqual(response.data['status'], 'in-progress')

        self.logout()
        response = self.client.post(self.url, {'title': 'Clean the room!'})
        self.assertEqual(401, response.status_code)

        username, email = 'anotherUser', 'anotherEmail@a.com'
        user = User.objects.create_user(
            username, email, self.password,
        )
        token = Token.objects.create(user=user)
        self.login(token)
        response = self.client.get(self.url)
        self.assertEqual(
            len(response.data), 0
        )

    def test_user_todos(self):
        Todo.objects.create(owner=self.user, title='Clean the desktop!')
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, 200)
        self.assertTrue(
            len(response.data) == Todo.objects.count()
        )

        response = self.client.get(self.url, {'status': 'completed'})
        self.assertEqual(200, response.status_code)
        self.assertEqual(len(response.data), 0)


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
        response = self.client.delete(self.url)
        self.assertEqual(204, response.status_code)
        todo_query = Todo.objects.filter(pk=self.todo.id)
        self.assertEqual(
            todo_query.count(), 0
        )

    def test_update_todo(self):
        new_title = 'clean the /tmp!'
        new_status = 'completed'

        response = self.client.patch(
            self.url,
            {'title': new_title, 'status': new_status},
        )
        self.assertEqual(200, response.status_code)
        self.assertEqual(
            response.data['title'], new_title
        )
        self.assertEqual(
            response.data['status'], new_status
        )
