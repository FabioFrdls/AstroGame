package com.utility;

import jakarta.persistence.Embeddable;

@Embeddable
public class Vector {
	public double x;
	public double y;
	public double z;
	
	public Vector() {}
	
	public Vector(double x, double y, double z) {
		this.x = x;
		this.y = y;
		this.z = z;
	}


	@Override
	public String toString() {
		return "X axis: " + x + ", Y axis: " + y + ", Z axis: " + z;
	}
	
	
}
