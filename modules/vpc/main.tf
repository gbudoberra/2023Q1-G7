resource "aws_vpc" "this" {
  cidr_block = var.vpc_cidr
  tags = {
    Name = var.name
  }
}


resource "aws_subnet" "this" {
  count = local.zones_count

  vpc_id            = aws_vpc.this.id
  cidr_block        = cidrsubnet(var.vpc_cidr, 8, count.index)
  availability_zone = local.availability_zones[count.index]

  tags = {
    Name = "private-subnet-${count.index}"
  }

}

resource "aws_route_table" "private" {
  vpc_id = aws_vpc.this.id
}

resource "aws_route_table_association" "private" {
  count          = local.zones_count
  subnet_id      = aws_subnet.this[count.index].id
  route_table_id = aws_route_table.private.id
}
