from rest_framework import serializers
from quote.models import Tossup

class ParagraphChildSerializer(serializers.Serializer):

    text = serializers.CharField(allow_blank=True, trim_whitespace=True)
    bold = serializers.BooleanField(allow_null=True)
    italic = serializers.BooleanField(allow_null=True)
    underline = serializers.BooleanField(allow_null=True)

    def create(self, validated_data):
        pass

    def update(self, instance, validated_data):
        pass


class ParagraphSerializer(serializers.BaseSerializer):

    type = serializers.CharField(default='paragraph')
    children = serializers.ListField(child=ParagraphChildSerializer())


class TossupSerializer(serializers.Serializer):

    # raw_tossup = serializers.ListField(child=serializers.JSONField())
    raw_tossup = serializers.JSONField()
    raw_answer = serializers.JSONField()

    def _parse_tossup(self, tossup_data):

        pass

    def create(self, validated_data):

        raw_tossup = validated_data['raw_tossup']
        raw_answer = validated_data['raw_answer']

        tossup_text = ''.join(child['text'] for child in raw_tossup['children'])
        main_answer = raw_answer['children'][0]
        answer_text = ''.join(child['text'] for child in main_answer['children'])

        power_pos = tossup_text.find('(*)')
        power_pos = power_pos if power_pos > -1 else None
        # we'll figure out later what to do about additional answerline instructions

        return Tossup(tossup_text=tossup_text, tossup_answer=answer_text, power_position=power_pos)

    def update(self, instance, validated_data):
        pass

