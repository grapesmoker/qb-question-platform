from django.shortcuts import render
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from quote.models import Tossup
from quote.serializers import TossupSerializer


@api_view(['GET', 'POST'])
def tossup_list(request):
    """
    List all code snippets, or create a new snippet.
    """
    if request.method == 'GET':
        tossups = Tossup.objects.all()
        serializer = TossupSerializer(tossups, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        print('posting')
        print(request.data)
        if len(request.data) == 2:
            raw_tossup, raw_answer = request.data
            tossup_data = {'raw_tossup': raw_tossup, 'raw_answer': raw_answer}
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        serializer = TossupSerializer(data=tossup_data)
        if serializer.is_valid():
            serializer.save()
            return Response(None, status=status.HTTP_201_CREATED)
        else:
            print(serializer.errors)

            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)