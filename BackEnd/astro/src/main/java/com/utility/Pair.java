package com.utility;

public class Pair<X, Y> {
	protected  X left;
	protected  Y right;
	
	public Pair() {}
	
	public Pair(X left, Y right) {
		super();
		this.left = left;
		this.right = right;
	}

	public X getLeft() {
		return left;
	}

	public void setLeft(X left) {
		this.left = left;
	}

	public Y getRight() {
		return right;
	}

	public void setRight(Y right) {
		this.right = right;
	}
	
	@Override
	public String toString() {
		return "(" + this.left + ", " + this.right + ")";
	}
	
}
