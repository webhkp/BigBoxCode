// Request.java

package com.bigboxcode.designpattern.prototype.prototype.request;

public abstract class Request implements Cloneable {

    public Object clone() {
        Object requestClone = null;

        try {
            requestClone = super.clone();
        } catch (CloneNotSupportedException exception) {
            exception.printStackTrace();
        }

        return requestClone;
    }

    abstract void send();
}
