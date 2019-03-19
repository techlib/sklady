#!/usr/bin/python3 -tt
# -*- coding: utf-8 -*-

__all__ = ['Manager']

from twisted.internet.threads import deferToThread
from twisted.internet import task, reactor
from twisted.python import log

from sklady.skladnik import Skladnik

class Manager(object):
	def __init__(self, db):
		self.db = db
		self.skladnik = Skladnik(self)

	def get_inventory(self):
		return self.skladnik.get_inventory()

# vim:set sw=4 ts=4 et:
