#!/bin/bash

export CLASSPATH=".:./antlr/antlr-4.8-complete.jar:$CLASSPATH"
antlr='java -jar ./antlr/antlr-4.8-complete.jar'
#alias grun='java org.antlr.v4.gui.TestRig'

rm -rf gen && mkdir gen && $antlr -Dlanguage=JavaScript RSQL.g4 -visitor -o gen
