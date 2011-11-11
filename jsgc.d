#!/usr/sbin/dtrace -s
/*
 * jsgc.d	JavaScript Garbage Collect trace.
 *
 * $Id: jsgc.d 3 2011-11-11 01:30:08Z brendan $
 *
 * Brendan Gregg - testing github.
 */

#pragma D option quiet

pid$target::JS_GC:entry
{
	self->vstart = vtimestamp;
}

pid$target::JS_GC:return
/self->vstart/
{
	this->oncpu = (vtimestamp - self->vstart) / 1000000;
	printf("%Y GC: %d CPU ms\n", walltimestamp, this->oncpu);
	self->vstart = 0;
}
