#!/usr/bin/python3 -tt

from setuptools import setup
import os.path

setup(
    name = 'sklady',
    version = '1',
    author = 'NTK',
    description = ('Tool for getting status of supplies in storage'),
    license = 'MIT',
    keywords = 'storage supplies database',
    url = 'http://github.com/techlib/sklady',
    include_package_data = True,
    package_data = {
        '': ['*.png', '*.js', '*.html'],
    },
    packages = [
        'sklady',
    ],
    classifiers = [
        'License :: OSI Approved :: MIT License',
    ],
    scripts = 'sklady-daemon'
)


# vim:set sw=4 ts=4 et:
# -*- coding: utf-8 -*-
