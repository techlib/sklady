
__all__ = ['Skladnik']

class Row(object):
    def __init__(self, id, name, quantity, price):
        self.id = id
        self.name = name
        self.quantity = quantity
        self.price = price
	

class Skladnik(object):
    def __init__(self, manager):
        self.manager = manager

    def get_inventory(self):
        rs = self.manager.db.execute("select cenidno, nazev, skladem, sklcena from FIS_01.TOBCENIK where skladem != 0")
        retval = []
        for i in rs:
            retval.append(Row(str(i[0]), str(i[1]), str(i[2]), str(i[3])))
        return retval;


# vim:set sw=4 ts=4 et:
# -*- coding: utf-8 -*-
