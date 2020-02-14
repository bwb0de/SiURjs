#!/usr/bin/env python3
# -*- coding: utf-8 -*-
#
#
#  Copyright 2017 Daniel Cruz <bwb0de@bwb0dePC>
#  Version 0.1
#
#  This program is free software; you can redistribute it and/or modify
#  it under the terms of the GNU General Public License as published by
#  the Free Software Foundation; either version 2 of the License, or
#  (at your option) any later version.
#
#  This program is distributed in the hope that it will be useful,
#  but WITHOUT ANY WARRANTY; without even the implied warranty of
#  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
#  GNU General Public License for more details.
#
#  You should have received a copy of the GNU General Public License
#  along with this program; if not, write to the Free Software
#  Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston,
#  MA 02110-1301, USA.
#
#

import json
import os

from collections import OrderedDict

from python_modules.cli_tools import input_num, limpar_tela
from python_modules.siur_global_config import pasta_de_dados

geral_nfo = ['nome', 'mote', 'conceito', 'metatipo', 'personalidade', 'profissao', 'idade', 'genero', 'afiliacoes', 'imagem', 'preludio']
capacidades = ['explosao', 'equilibrio', 'coordenacao', 'ritmo', 'vigor', 'sensibilidade', 'presenca', 'malícia', 'integridade', 'memoria', 'logicidade', 'determinacao', 'expressividade', 'eloquencia', 'reatividade', 'atencao']

def mkpc(geral_nfo=geral_nfo, capacidades=capacidades):
        novo_jogador = OrderedDict()
        limpar_tela("Informações gerais do personagem")
        for i in geral_nfo:
                novo_jogador[i] = input(i+': ')

        novo_jogador['itens'] = []
        novo_jogador['notas'] = []

        limpar_tela("Capacidades [+1 auto]")
        novo_jogador['capacidades'] = {}
        for i in capacidades:
                data = input_num(i)
                novo_jogador['capacidades'][i] = data+1

        limpar_tela("Equipamentos")
        r = None
        while True:
                if r == 'n' or r == 'N':
                        break
                data = {}
                data['nome'] = input("Equipamento: ")
                data['peso'] = input("Peso: ")
                data['dano'] = input("Dano: ")
                novo_jogador['itens'].append(data)
                r = input('Deseja adicionar outro equipamento? (s/n) ')

        limpar_tela("Anotações")
        r = None
        while True:
                if r == 'n' or r == 'N':
                        break
                data = {}
                data['nome'] = input("Adicionar nota: ")
                novo_jogador['notas'].append(data)
                r = input('Deseja registrar outra nota? (s/n) ')

        limpar_tela("Salvando informações...")
        arquivo = input('Nome do arquivo de saída: ')

        with open(pasta_de_dados+os.sep+arquivo, 'w') as f_output:
                f_output.write((json.dumps(novo_jogador, separators=(', ', ' : '), indent=4, ensure_ascii=False)))
        
